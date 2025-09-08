from flask import Blueprint, jsonify
from ..models.questao_nova import QuestaoNova
import json # Importamos json para ter mais controle

questoes_pas_uem_bp = Blueprint('questoes_pas_uem_bp', __name__)

@questoes_pas_uem_bp.route('/api/questoes_pas_uem', methods=['GET'])
def get_questoes():
    """
    Endpoint para buscar todas as questões do PAS UEM no banco de dados.
    VERSÃO À PROVA DE BALAS.
    """
    print("--- ROTA /api/questoes_pas_uem ACIONADA ---") # Log para sabermos que a rota foi chamada
    try:
        # 1. Busca todas as questões no banco de dados.
        questoes_objetos = QuestaoNova.query.all()
        print(f"Encontradas {len(questoes_objetos)} questões no banco.")

        # 2. Converte a lista de objetos para uma lista de dicionários.
        #    Vamos fazer isso manualmente para ter certeza do que está acontecendo.
        resultado_final = []
        for q in questoes_objetos:
            # O método to_dict() já faz a conversão e o json.loads.
            # Se houver um erro aqui, saberemos que é no to_dict().
            dicionario_da_questao = q.to_dict()
            resultado_final.append(dicionario_da_questao)
        
        print("Questões convertidas para dicionário com sucesso.")
        
        # 3. Envia a lista de questões como uma resposta JSON bem-sucedida.
        return jsonify(resultado_final)
        
    except Exception as e:
        # Se algo der errado, imprime o erro DETALHADO no log do Render.
        print("\n!!!!!!!!!!!!!! ERRO GRAVE NA API !!!!!!!!!!!!!!")
        import traceback
        print(f"TIPO DE ERRO: {type(e).__name__}")
        print(f"MENSAGEM DO ERRO: {e}")
        traceback.print_exc() # Imprime o rastreamento completo do erro.
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n")
        
        return jsonify({"error": "Ocorreu um erro interno grave ao buscar as questões.", "details": str(e)}), 500

