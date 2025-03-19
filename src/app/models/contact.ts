export interface Contact {
  id: number | null;
  nome: string;
  email: string | null;
  celular: string | null;
  telefone?: string | null;
  favorito: 'S' | 'N';
  ativo: 'S' | 'N';
  dataCadastro: Date;
}
