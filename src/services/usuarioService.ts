import { AppDataSource, BlacklistDataSource } from '../config/database';
import { Blacklist } from '../model/blacklist';
import { Usuario } from '../model/usuario';
import { hashsenha } from '../utils/criptografia';

export class UsuarioService {
  private usuarioRepository = AppDataSource.getRepository(Usuario);
  private blacklistRepository = BlacklistDataSource.getRepository(Blacklist);

  async criarUsuario(dados: Partial<Usuario>): Promise<Usuario> {
    const senhaCriptografada = await hashsenha(dados.senha!);
    const usuario = this.usuarioRepository.create({ ...dados, senha: senhaCriptografada });
    return await this.usuarioRepository.save(usuario);
  }

  async obterUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOneBy({ email });
  }

  async obterUsuarioPorId(id: number): Promise<Usuario | null> {
    return await this.usuarioRepository.findOneBy({ id });
  }

  async atualizarUsuario(id: number, dados: Partial<Usuario>): Promise<Usuario | null> {
    const senhaUsuarioHash = await hashsenha(dados.senha!);
    dados.senha = senhaUsuarioHash;
    await this.usuarioRepository.update(id, dados);
    return this.obterUsuarioPorId(id);
  }

  async deletarLogicoUsuario(id: number): Promise<void> {
    await this.usuarioRepository.update(id, { deletado: true });
  }

  async deletarPermanenteUsuario(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);

    const blacklistEntry = this.blacklistRepository.create({ usuario_id: id });
    await this.blacklistRepository.save(blacklistEntry);
  }
}
