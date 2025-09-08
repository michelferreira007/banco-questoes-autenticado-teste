from flask import Blueprint, jsonify
from ..models.questao_nova import QuestaoNova

# Cria o Blueprint (um conjunto de rotas)
questoes_pas_uem_bp = Blueprint('questoes_pas_uem_bp', __name__)

@questoes_pas_uem_bp.route('/api/questoes_pas_uem', methods=['GET'])
def get_questoes():
    """
    Este é o endpoint que o seu frontend chama.
    Ele busca as questões no banco de dados e as envia como JSON.
    """
    try:
        # 1. Busca todas as questões no banco de dados.
        questoes = QuestaoNova.query.all()
        
        # 2. Converte cada objeto de questão em um dicionário (formato JSON amigável).
        #    É aqui que a "mágica" do nosso método to_dict() acontece.
        #    Esta linha corrige o erro 500 que vimos no log.
        resultado = [q.to_dict() for q in questoes]
        
        # 3. Envia a lista de questões como uma resposta JSON bem-sucedida.
        return jsonify(resultado)
        
    except Exception as e:
        # Se algo der errado, imprime o erro no log do Render e envia uma resposta de erro.
        print(f"ERRO NA ROTA /api/questoes_pas_uem: {e}")
        return jsonify({"error": "Ocorreu um erro interno ao buscar as questões.", "details": str(e)}), 500
