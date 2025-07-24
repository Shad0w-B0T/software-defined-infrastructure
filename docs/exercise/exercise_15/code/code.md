# Exercise 15

<script setup>
import main from '../../../../src/exercise_15/main.tf?raw'
import output from '../../../../src/exercise_15/outputs.tf?raw'
import variables from '../../../../src/exercise_15/variables.tf?raw'
import secrets from '../../../../src/exercise_15/secrets.auto.tfvars.template?raw'
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
