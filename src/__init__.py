from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os

# Cria a variável do banco de dados, mas não a inicializa ainda
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    """Cria e configura uma instância da aplicação Flask."""
    app = Flask(__name__, static_folder='static', static_url_path='')
    CORS(app)

    # Configuração do banco de dados a partir da variável de ambiente
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializa o banco de dados e as migrações com a aplicação
    db.init_app(app)
    migrate.init_app(app, db)

    # Importa e registra os Blueprints (as rotas da sua API)
    from .routes.questoes_pas_uem import questoes_pas_uem_bp
    # Adicione aqui outras rotas que você tiver, como a de usuários
    # from .routes.user import user_bp

    app.register_blueprint(questoes_pas_uem_bp)
    # app.register_blueprint(user_bp)

    @app.route('/')
    def index():
        return app.send_static_file('index.html')

    return app
