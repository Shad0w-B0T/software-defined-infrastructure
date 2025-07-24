# Exercise 12

<script setup>
import main from '../../../../src/exercise_12/main.tf?raw'
import output from '../../../../src/exercise_12/outputs.tf?raw'
import variables from '../../../../src/exercise_12/variables.tf?raw'
import secrets from '../../../../src/exercise_12/secrets.auto.tfvars.template?raw'
import nginx from '../../../../src/exercise_12/nginx-init.sh?raw'
import readme from '../../../../src/exercise_12/readme.md?raw'
import CodeInclude from '../../../components/CodeInclude.vue'
</script>


``main.tf``
<CodeInclude :content="main" />

``outputs.tf``
<CodeInclude :content="output" />

``variables.tf``
<CodeInclude :content="variables" />

``secrets.auto.tfvars.template``
<CodeInclude :content="secrets" />

``nginx-init.sh``
<CodeInclude :content="nginx" />

``Readme.md``
<CodeInclude :content="readme" />

```file src/exercise_12/main.tf hcl
```

```file src/exercise_12/outputs.tf hcl
```

```file src/exercise_12/secrets.auto.tfvars.template hcl
```

```file src/exercise_12/variables.tf hcl
```

```file src/exercise_12/nginx-init.sh shell
```