import sys
from flask import Flask, jsonify, request
from transformers import pipeline, GPT2TokenizerFast, AutoModelForCausalLM

app = Flask(__name__)

# Run the following to use:
# $ sudo apt update
# $ sudo apt install python3 python3-pip -y
# $ sudo pip3 install -U pip
# $ sudo pip3 install flask torch
# $ sudo pip3 install git+https://github.com/huggingface/transformers#transformers
# Note that the latest version of transformers is needed because the GPT-J class is
# not released yet.
# $ sudo python3 hf_inference.py hub

if sys.argv[1] == "hub":
    model = AutoModelForCausalLM.from_pretrained("EleutherAI/gpt-neo-1.3B")
else:
    model = AutoModelForCausalLM.from_pretrained("./hf_model")
tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")


@app.route("/complete", methods=["POST"])
def complete():
    content = request.json
    message_context = content["message_context"]

    max_time = 10
    if "conversation_mode" in content:
        conversation_mode = content["conversation_mode"]
        if conversation_mode:
            max_time = None

    num_words = len(message_context.split())
    ideal_length = 300
    max_length = num_words * 2 + ideal_length
    generation = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_length=max_length,
        return_full_text=False,
        max_time=max_time,
    )
    generated_text = generation(message_context)
    print(f"Input:\n{message_context}\nOutput:{generated_text}")
    return jsonify(generated_text)


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=80)
