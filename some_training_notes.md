Resources:
* [[D] Fine-tuning GPT-J: lessons learned : MachineLearning](https://www.reddit.com/r/MachineLearning/comments/ptu24e/d_finetuning_gptj_lessons_learned/)
* [mesh-transformer-jax/howto_finetune.md at master · kingoflolz/mesh-transformer-jax](https://github.com/kingoflolz/mesh-transformer-jax/blob/master/howto_finetune.md)


**Train model (https://cloud.google.com/tpu/docs/jax-quickstart-tpu-vm)**

Create TPU VM
gcloud alpha compute tpus tpu-vm create [[GUILD ID]] \
--zone europe-west4-a \
--accelerator-type v3-8 \
--version v2-alpha

Connect with SSH
gcloud alpha compute tpus tpu-vm ssh [[GUILD ID]] --zone europe-west4-a

Clone the git repo
git clone https://github.com/HHousen/mesh-transformer-jax

Change directory
cd mesh-transformer-jax

Install requirements
pip3 install -r requirements.txt

Install specific version
pip3 install jax==0.2.12

Run training
python3 device_train.py --config=configs/discord-gpt-generic-config.json --tune-model-path=gs://discord-gpt-models/step_383500/

Run slimming
python3 slim_model.py --config configs/discord-gpt-generic-config.json

Notify command machine that training is done

Training can either be done as a queue or we can do simultaneous training on multiple machine for multiple guilds.

**Deploy model prediction service ()**

gcloud compute instances create [[GUILD ID]] \
  --zone=europe-west4-a \
  --image-family=tf2-ent-latest-cpu \
  --image-project=deeplearning-platform-release \
  --machine-type=e2-standard-8 \
  --metadata-from-file=startup-script=/path/to/bash/start/up/script

We might need a GPU with above command: --accelerator type=nvidia-tesla-p100,count=1 (https://cloud.google.com/compute/docs/gpus/create-vm-with-gpus#create-new-gpu-vm). Alternatively, we could create TPU instances for inference. Want to test CPU vs GPU vs TPU.

Start up script will run device_serve.py with the correct config and will notify the command machine when it is done.

Command machine will have database and log requests. If there has not been a request in the past 20 minutes then it destroys the machine. It will manage a list of machines currently available. When a request comes in for inference, if there is a machine loaded for that guild, it will ask it for a prediction and return it to the bot.

**Next commands to get guildmodel created:**
Run slimming
python3 slim_model.py --config configs/new-config.json
