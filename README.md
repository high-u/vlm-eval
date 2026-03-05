```bash
./build/bin/llama-server -hf unsloth/Qwen3.5-35B-A3B-GGUF:UD-Q4_K_XL --jinja --ctx-size 32768 --threads 6 --n-cpu-moe 40 --chat-template-kwargs "{\"enable_thinking\": false}" --alias qwen

./build/bin/llama-server -hf unsloth/Qwen3.5-9B-GGUF:UD-Q4_K_XL --jinja --ctx-size 32768 --chat-template-kwargs "{\"enable_thinking\": false}" --alias qwen

./build/bin/llama-server -hf unsloth/Qwen3.5-4B-GGUF:UD-Q6_K_XL --jinja --ctx-size 32768 --chat-template-kwargs "{\"enable_thinking\": false}" --alias qwen

./build/bin/llama-server -hf unsloth/Qwen3.5-2B-GGUF:UD-Q8_K_XL --jinja --ctx-size 32768 --chat-template-kwargs "{\"enable_thinking\": false}" --alias qwen
```
