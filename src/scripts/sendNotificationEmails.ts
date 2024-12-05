import { AppDataSource } from '../config/database';
import { Usuario } from '../model/usuario';
import nodemailer from 'nodemailer';
import { emailConfig } from '../config/email';

(async () => {
  try {
    // Inicializa o data source
    await AppDataSource.initialize();

    const usuarioRepository = AppDataSource.getRepository(Usuario);

    // Obtém todos os usuários não deletados
    const usuarios = await usuarioRepository.find({ where: { deletado: false } });

    if (usuarios.length === 0) {
      console.log('Nenhum usuário para notificar.');
      await AppDataSource.destroy();
      return;
    }

    // Configura o transporter do Nodemailer
    const transporter = nodemailer.createTransport(emailConfig);

    // Conteúdo do e-mail
    const mailOptions = {
      from: '"Willians cino" <seu_email@dominio.com>',
      subject: 'Aviso Importante: Vazamento de Dados',
      text: 'Prezado, informamos que houve um vazamento de dados em nosso sistema. Por favor, tome as medidas necessárias.',
      html: '<p>Prezado usuário,</p><p>Informamos que houve um <strong>vazamento de dados</strong> em nosso sistema. Por favor, tome as medidas necessárias.</p>',
    };

    // Envia o e-mail para cada usuário
    for (const usuario of usuarios) {
      const personalizedMailOptions = {
        ...mailOptions,
        to: usuario.email,
        // Opcional: Personalizar a mensagem com o nome do usuário
        // text: `Prezado ${usuario.nome}, ...`,
        // html: `<p>Prezado ${usuario.nome},</p><p>...</p>`,
      };

      try {
        await transporter.sendMail(personalizedMailOptions);
        console.log(`E-mail enviado para: ${usuario.email}`);
      } catch (error) {
        console.error(`Erro ao enviar e-mail para ${usuario.email}:`, error);
      }
    }

    // Fecha a conexão com o banco de dados
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Erro ao enviar e-mails:', error);
  }
})();
