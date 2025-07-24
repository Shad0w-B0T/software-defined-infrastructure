# Exercise 11

<script setup>
import main from '../../../../src/exercise_11/main.tf?raw'
import output from '../../../../src/exercise_11/outputs.tf?raw'
import variables from '../../../../src/exercise_11/variables.tf?raw'
import secrets from '../../../../src/exercise_11/secrets.auto.tfvars.template?raw'
import CodeInclude from '../../../components/CodeInclude.vue'
</script>


``Main.tf``
<CodeInclude :content="main" />

``outputs.tf``
<CodeInclude :content="output" />

``variables.tf``
<CodeInclude :content="variables" />

``secrets.auto.tfvars.template``
<CodeInclude :content="secrets" />

```file src/exercise_11/main.tf hcl
```

```file src/exercise_11/outputs.tf hcl
```

```file src/exercise_11/secrets.auto.tfvars.template hcl
```

```file src/exercise_11/variables.tf hcl
```