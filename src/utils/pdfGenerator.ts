import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

/**
 * Utilitário de Geração e Exportação Direta de PDF para o CONSULPREV SST
 * 
 * Utiliza html2canvas-pro (com suporte nativo a cores oklch e CSS moderno do Tailwind v4)
 * e jsPDF para download direto do arquivo .pdf sem depender do diálogo do navegador.
 */

export interface ExportPdfOptions {
  filename?: string;
  elementId?: string;
  element?: HTMLElement | null;
  orientation?: 'portrait' | 'landscape';
  marginMm?: number;
  singlePage?: boolean;
  onProgress?: (mensagem: string) => void;
}

export interface ExportResult {
  sucesso: boolean;
  mensagem: string;
  filename: string;
}

export async function exportarElementoParaPdf(options?: ExportPdfOptions): Promise<ExportResult> {
  const defaultFilename = `CONSULPREV-SST-${new Date().toISOString().split('T')[0]}.pdf`;
  const filename = options?.filename || defaultFilename;
  const margin = options?.marginMm ?? 8; // 8mm de margem

  options?.onProgress?.('Localizando documento para conversão...');

  try {
    // 1. Identificar o elemento alvo para impressão/PDF
    let targetElement: HTMLElement | null = options?.element || null;

    if (!targetElement && options?.elementId) {
      targetElement = document.getElementById(options.elementId);
    }

    if (!targetElement) {
      // Prioriza elementos com classe .print-page que estejam visíveis
      const printPages = Array.from(document.querySelectorAll<HTMLElement>('.print-page'));
      const visivel = printPages.find(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      });
      targetElement = visivel || printPages[0] || null;
    }

    // Se ainda não encontrou, busca a tag main
    if (!targetElement) {
      targetElement = document.querySelector('main');
    }

    if (!targetElement) {
      throw new Error('Nenhum elemento de conteúdo encontrado na página atual.');
    }

    // Auto-detecta orientação paisagem se o elemento possuir classe print-landscape ou data-orientation
    const isLandscape = 
      options?.orientation === 'landscape' ||
      targetElement.classList.contains('print-landscape') ||
      targetElement.dataset.orientation === 'landscape' ||
      Boolean(targetElement.querySelector('.print-landscape'));

    const orientation = isLandscape ? 'landscape' : (options?.orientation || 'portrait');

    options?.onProgress?.(`Renderizando alta resolução (${orientation === 'landscape' ? 'Folha Paisagem' : 'Folha Retrato'})...`);

    // Salva estado original de display caso estivesse oculto
    const originalDisplay = targetElement.style.display;
    if (window.getComputedStyle(targetElement).display === 'none') {
      targetElement.style.display = 'block';
    }

    // 2. Renderiza com html2canvas-pro (compatível com Tailwind v4 e oklch)
    const canvas = await html2canvas(targetElement, {
      scale: 2, // 2x para nitidez vetorial equivalente a 300 DPI
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      ignoreElements: (element) => {
        // Ignora botões e barras marcadas com no-print
        if (element.classList && element.classList.contains('no-print')) {
          return true;
        }
        return false;
      }
    });

    // Restaura display caso tenha sido modificado
    if (originalDisplay) {
      targetElement.style.display = originalDisplay;
    }

    options?.onProgress?.('Montando páginas do arquivo PDF...');

    // 3. Dimensões padrão A4 em milímetros
    const pageWidth = orientation === 'landscape' ? 297 : 210;
    const pageHeight = orientation === 'landscape' ? 210 : 297;
    const printableWidth = pageWidth - (margin * 2);
    const printableHeight = pageHeight - (margin * 2);

    // Inicializa jsPDF
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // 4. Determina se o documento deve caber 100% em 1 única folha (Certificado A4 Paisagem, etc.)
    const isSinglePage = Boolean(
      options?.singlePage || 
      orientation === 'landscape' || 
      isLandscape ||
      targetElement.getAttribute('data-single-page') === 'true' ||
      targetElement.classList.contains('print-landscape')
    );

    let pageCount = 0;

    if (isSinglePage) {
      // Ajuste proporcional inteligente: garante que 100% da imagem caiba em 1 única folha
      // SEM CORTAR A PARTE INFERIOR nem gerar uma segunda página
      const imgRatio = canvas.width / canvas.height;
      const printableRatio = printableWidth / printableHeight;

      let finalWidth = printableWidth;
      let finalHeight = printableHeight;

      if (imgRatio >= printableRatio) {
        // Imagem é mais larga proporcionalmente: ajusta pela largura total
        finalWidth = printableWidth;
        finalHeight = printableWidth / imgRatio;
      } else {
        // Imagem é mais alta proporcionalmente: ajusta pela ALTURA máxima para JAMAIS cortar nada embaixo!
        finalHeight = printableHeight;
        finalWidth = printableHeight * imgRatio;
      }

      // Centraliza na página A4 preservando as margens
      const xOffset = margin + (printableWidth - finalWidth) / 2;
      const yOffset = margin + (printableHeight - finalHeight) / 2;

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData, 'JPEG', xOffset, yOffset, finalWidth, finalHeight);
      pageCount = 1;
    } else {
      // 5. Paginação inteligente para documentos multi-páginas (ASO, PGR, PCMSO)
      const sliceHeightPx = Math.floor((canvas.width / printableWidth) * printableHeight);
      let renderedHeight = 0;

      while (renderedHeight < canvas.height) {
        const currentSliceHeight = Math.min(sliceHeightPx, canvas.height - renderedHeight);

        // Cria canvas temporário para cada fatia de página A4
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = currentSliceHeight;
        const ctx = pageCanvas.getContext('2d');

        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(
            canvas,
            0, renderedHeight, canvas.width, currentSliceHeight,
            0, 0, canvas.width, currentSliceHeight
          );
        }

        const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);
        const mmSliceHeight = (currentSliceHeight * printableWidth) / canvas.width;

        if (pageCount > 0) {
          pdf.addPage('a4', orientation);
        }

        pdf.addImage(imgData, 'JPEG', margin, margin, printableWidth, mmSliceHeight);

        renderedHeight += currentSliceHeight;
        pageCount++;
      }
    }

    options?.onProgress?.('Finalizando e salvando arquivo...');

    // 5. Salva o PDF diretamente no computador do usuário
    pdf.save(filename);

    options?.onProgress?.('PDF baixado com sucesso!');

    return {
      sucesso: true,
      mensagem: `Documento "${filename}" gerado e baixado com sucesso (${pageCount} pág.).`,
      filename
    };
  } catch (erro: any) {
    console.error('Erro na exportação para PDF:', erro);
    const msg = erro?.message || 'Falha ao processar o layout do documento.';
    return {
      sucesso: false,
      mensagem: `Não foi possível gerar o PDF: ${msg}`,
      filename
    };
  }
}
