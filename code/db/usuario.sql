CREATE USER 'relatorio'@'%' IDENTIFIED BY 'relatorio_password';
GRANT SELECT ON farmacia.* TO 'relatorio'@'%';

FLUSH PRIVILEGES;
