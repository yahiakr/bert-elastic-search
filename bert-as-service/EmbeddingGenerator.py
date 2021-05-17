import json
import torch

import transformers
from transformers import (WEIGHTS_NAME,BertConfig, BertForMaskedLM, BertTokenizer)

class EmbeddingGenerator:
    def __init__(self, config):
        self.tokenizer = BertTokenizer.from_pretrained(config['model'])
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"using device: {self.device}")

        model = BertForMaskedLM.from_pretrained(config['model'], output_hidden_states=True)
        if config['import_model']:
          print(f"importing the model from: {config['model_dir']}")
          model.load_state_dict(torch.load(config['model_dir']))
          model.eval()
        model.to(self.device)
        self.model = model

    def predict(self, text):
        input_ids = torch.tensor(self.tokenizer.encode(text, add_special_tokens=True)).unsqueeze(0)
        outputs = self.model(input_ids)

        embeddings = outputs[1][-1]
        embeddings = embeddings.detach().numpy()[0]

        size = embeddings.shape[0]
        sum_array = [sum(x) for x in zip(*embeddings)]
        avg_array = [sum_array[i]/size for i in range(len(sum_array))]

        return avg_array