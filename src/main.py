from . import create_app, db

# Cria a aplicação usando a nossa factory function do __init__.py
app = create_app()

# ESTA É A PARTE MÁGICA
# Este bloco de código será executado uma vez quando a aplicação iniciar.
# Ele garante que todas as tabelas definidas nos seus modelos
# (como a QuestaoNova) sejam criadas no banco de dados.
with app.app_context():
    print("--- Verificando e criando tabelas do banco de dados (se necessário) ---")
    db.create_all()
    print("--- Tabelas prontas! ---")

# O resto do arquivo continua normal, se você tiver mais código aqui.
if __name__ == "__main__":
    app.run()
