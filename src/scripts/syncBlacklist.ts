import { AppDataSource, BlacklistDataSource } from '../config/database';
import { Usuario } from '../model/usuario';
import { Blacklist } from '../model/blacklist';

(async () => {
  try {
    await Promise.all([AppDataSource.initialize(), BlacklistDataSource.initialize()]);

    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const blacklistRepository = BlacklistDataSource.getRepository(Blacklist);

    const blacklistEntries = await blacklistRepository.find();
    const blacklistIds = blacklistEntries.map(entry => entry.usuario_id);

    if (blacklistIds.length > 0) {
      await usuarioRepository.delete(blacklistIds);
      console.log(`Usuários com IDs ${blacklistIds.join(', ')} foram excluídos do banco de dados.`);
    } else {
      console.log('Nenhum usuário na blacklist.');
    }

    await Promise.all([AppDataSource.destroy(), BlacklistDataSource.destroy()]);
  } catch (error) {
    console.error('Erro ao sincronizar a blacklist:', error);
  }
})();
