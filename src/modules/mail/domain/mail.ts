class Mail {
  mailList: string[];
  mailListBCC: string[];
  body: string;
  constructor(mailList: string[], mailListBCC: string[], body: string) {
    this.mailList = this.validateEmail(mailList);
    this.mailListBCC = this.validateEmail(mailListBCC);
    this.body = body;
  }

  /**
   * Verificamos toda la lista de mails
   * @param mailList string[]
   * @returns 
   */
  private validateEmail(mailList: string[]) {
    for (const mail of mailList) {
        if (!this.isEmailValid(mail)) throw new ValidationError(`El email ${mail} es invalido`);
    }
    return mailList
  }
  /**
   * Verifica si un correo es valido o no
   * @param email string
   * @returns 
   */
  private isEmailValid(email: string) {
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email) return false;

    if (email.length > 254) return false;

    const valid = emailRegex.test(email);
    if (!valid) return false;

    // Further checking of some things regex can't handle
    const parts = email.split('@');
    if (parts[0].length > 64) return false;

    const domainParts = parts[1].split('.');
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    return true;
  }
}
