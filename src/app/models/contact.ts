export interface Contact {
  id: number;
  nome: string;
  email: string | null;
  celular: string;
  telefone?: string;
  favorito: 'S' | 'N';
  ativo: 'S' | 'N';
  dataCadastro: Date;
}
