from .. import db
import json

# A única responsabilidade deste arquivo é definir a classe.
class QuestaoNova(db.Model):
    __tablename__ = 'questoes_pas_uem'
    
    id = db.Column(db.Integer, primary_key=True)
    ano = db.Column(db.Integer, nullable=False)
    prova = db.Column(db.String(100), nullable=False)
    materia = db.Column(db.String(100), nullable=False)
    numero_questao = db.Column(db.Integer, nullable=False)
    enunciado = db.Column(db.Text, nullable=False)
    imagem = db.Column(db.String(255), nullable=True)
    
    # O campo crucial para as afirmativas de somatória
    afirmativas = db.Column(db.Text, nullable=False)
    
    resposta_soma = db.Column(db.Integer, nullable=False)
    resolucao = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'ano': self.ano,
            'prova': self.prova,
            'materia': self.materia,
            'numero_questao': self.numero_questao,
            'enunciado': self.enunciado,
            'imagem': self.imagem,
            'afirmativas': json.loads(self.afirmativas), # Transforma o texto de volta em lista
            'resposta_soma': self.resposta_soma,
            'resolucao': self.resolucao
        }



