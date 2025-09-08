import json
import os
import traceback
from sqlalchemy import create_engine, text

print("--- INICIANDO SCRIPT populate_questoes_novas.py (VERSÃO SOMATÓRIA) ---")

try:
    print("Tentando conectar ao banco de dados...")
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        raise ValueError("Erro Crítico: Variável de ambiente DATABASE_URL não encontrada.")
    
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
        print("URL do banco de dados corrigida para usar 'postgresql://'")

    engine = create_engine(database_url)
    
    with engine.connect() as connection:
        print("Conexão com o banco de dados bem-sucedida!")

        print("Tentando ler o arquivo JSON 'questoes_pas_uem.json'...")
        json_file_path = 'questoes_pas_uem.json'
        with open(json_file_path, 'r', encoding='utf-8') as f:
            questoes = json.load(f)
        print(f"Arquivo JSON lido com sucesso. Encontradas {len(questoes)} questões.")

        print("Limpando a tabela 'questoes_pas_uem' para evitar duplicatas...")
        connection.execute(text("DROP TABLE IF EXISTS questoes_pas_uem CASCADE;"))
        print("Tabela antiga removida (se existia). O sistema irá recriá-la.")
        
        # O Flask (db.create_all) irá recriar a tabela com a nova estrutura no deploy.
        # Este script apenas insere os dados após a recriação.

        print("Iniciando a inserção das questões no banco de dados...")
        for questao in questoes:
            afirmativas_json = json.dumps(questao['afirmativas'])

            stmt = text("""
                INSERT INTO questoes_pas_uem (ano, prova, materia, numero_questao, enunciado, imagem, afirmativas, resposta_soma, resolucao)
                VALUES (:ano, :prova, :materia, :numero_questao, :enunciado, :imagem, :afirmativas, :resposta_soma, :resolucao)
            """)
            
            connection.execute(stmt, parameters={
                "ano": questao['ano'],
                "prova": questao['prova'],
                "materia": questao['materia'],
                "numero_questao": questao['numero_questao'],
                "enunciado": questao['enunciado'],
                "imagem": questao.get('imagem'),
                "afirmativas": afirmativas_json,
                "resposta_soma": questao['resposta_soma'],
                "resolucao": questao.get('resolucao')
            })
        
        connection.commit()
        print(f"SUCESSO! {len(questoes)} questões de somatória foram inseridas no banco de dados.")

except Exception as e:
    print("\n" + "="*80)
    print("!!!!!!!!!!!!!! OCORREU UM ERRO !!!!!!!!!!!!!!")
    print(f"TIPO DE ERRO: {type(e).__name__}")
    print(f"MENSAGEM DO ERRO: {e}")
    print("\n--- RASTREAMENTO COMPLETO DO ERRO (Traceback) ---")
    traceback.print_exc()
    print("="*80 + "\n")

finally:
    print("--- FIM DO SCRIPT populate_questoes_novas.py ---")



