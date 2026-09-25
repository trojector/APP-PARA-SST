import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  onSnapshot,
  query,
  limit
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  Empresa, 
  Colaborador, 
  TreinamentoNR, 
  CATRegistro, 
  FichaEPI, 
  ExtintorItem, 
  ASORegistro,
  ChecklistInspecao
} from '../types/sst';
import {
  empresaPadrao,
  colaboradoresIniciais,
  treinamentosIniciais,
  catsIniciais,
  fichasEpiIniciais,
  extintoresIniciais,
  asosIniciais,
  checklistsIniciais
} from '../data/sstData';

// Coleção: Empresa
export async function salvarEmpresa(empresa: Empresa): Promise<void> {
  const path = 'empresa';
  try {
    const docRef = doc(db, path, empresa.id || 'principal');
    await setDoc(docRef, { ...empresa, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${empresa.id || 'principal'}`);
  }
}

export function ouvirEmpresa(onData: (empresa: Empresa) => void) {
  const path = 'empresa';
  const docRef = doc(db, path, 'principal');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data() as Empresa);
      } else {
        // Se ainda não existir no Firestore, salva os dados padrão
        salvarEmpresa({ ...empresaPadrao, id: 'principal' }).catch(console.error);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, `${path}/principal`);
    }
  );
}

// Coleção: Treinamentos
export async function salvarTreinamento(treinamento: TreinamentoNR): Promise<void> {
  const path = 'treinamentos';
  try {
    const docRef = doc(db, path, treinamento.id);
    await setDoc(docRef, treinamento, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${treinamento.id}`);
  }
}

export function ouvirTreinamentos(onData: (treinamentos: TreinamentoNR[]) => void) {
  const path = 'treinamentos';
  const colRef = collection(db, path);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const dados = snapshot.docs.map(doc => doc.data() as TreinamentoNR);
        onData(dados);
      } else {
        // Popula com dados iniciais do instrutor Marcos França se o banco estiver vazio
        treinamentosIniciais.forEach(t => salvarTreinamento(t).catch(console.error));
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Coleção: Colaboradores
export async function salvarColaborador(colaborador: Colaborador): Promise<void> {
  const path = 'colaboradores';
  try {
    const docRef = doc(db, path, colaborador.id);
    await setDoc(docRef, colaborador, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${colaborador.id}`);
  }
}

export function ouvirColaboradores(onData: (colaboradores: Colaborador[]) => void) {
  const path = 'colaboradores';
  const colRef = collection(db, path);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const dados = snapshot.docs.map(doc => doc.data() as Colaborador);
        onData(dados);
      } else {
        colaboradoresIniciais.forEach(c => salvarColaborador(c).catch(console.error));
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Coleção: CATs
export async function salvarCat(cat: CATRegistro): Promise<void> {
  const path = 'cats';
  try {
    const docRef = doc(db, path, cat.id);
    await setDoc(docRef, cat, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${cat.id}`);
  }
}

export function ouvirCats(onData: (cats: CATRegistro[]) => void) {
  const path = 'cats';
  const colRef = collection(db, path);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const dados = snapshot.docs.map(doc => doc.data() as CATRegistro);
        onData(dados);
      } else {
        catsIniciais.forEach(c => salvarCat(c).catch(console.error));
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Coleção: Fichas de EPI
export async function salvarFichaEpi(ficha: FichaEPI): Promise<void> {
  const path = 'fichas_epi';
  try {
    const docRef = doc(db, path, ficha.id);
    await setDoc(docRef, ficha, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${ficha.id}`);
  }
}

export function ouvirFichasEpi(onData: (fichas: FichaEPI[]) => void) {
  const path = 'fichas_epi';
  const colRef = collection(db, path);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const dados = snapshot.docs.map(doc => doc.data() as FichaEPI);
        onData(dados);
      } else {
        fichasEpiIniciais.forEach(f => salvarFichaEpi(f).catch(console.error));
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Coleção: Extintores
export async function salvarExtintor(extintor: ExtintorItem): Promise<void> {
  const path = 'extintores';
  try {
    const docRef = doc(db, path, extintor.id);
    await setDoc(docRef, extintor, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${extintor.id}`);
  }
}

export function ouvirExtintores(onData: (extintores: ExtintorItem[]) => void) {
  const path = 'extintores';
  const colRef = collection(db, path);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const dados = snapshot.docs.map(doc => doc.data() as ExtintorItem);
        onData(dados);
      } else {
        extintoresIniciais.forEach(e => salvarExtintor(e).catch(console.error));
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Coleção: ASOs
export async function salvarAso(aso: ASORegistro): Promise<void> {
  const path = 'asos';
  try {
    const docRef = doc(db, path, aso.id);
    await setDoc(docRef, aso, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${aso.id}`);
  }
}

export function ouvirAsos(onData: (asos: ASORegistro[]) => void) {
  const path = 'asos';
  const colRef = collection(db, path);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const dados = snapshot.docs.map(doc => doc.data() as ASORegistro);
        onData(dados);
      } else {
        asosIniciais.forEach(a => salvarAso(a).catch(console.error));
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Coleção: Checklists
export async function salvarChecklist(checklist: ChecklistInspecao): Promise<void> {
  const path = 'checklists';
  try {
    const docRef = doc(db, path, checklist.id);
    await setDoc(docRef, checklist, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${checklist.id}`);
  }
}

export function ouvirChecklists(onData: (checklists: ChecklistInspecao[]) => void) {
  const path = 'checklists';
  const colRef = collection(db, path);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const dados = snapshot.docs.map(doc => doc.data() as ChecklistInspecao);
        onData(dados);
      } else {
        checklistsIniciais.forEach(c => salvarChecklist(c).catch(console.error));
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}
