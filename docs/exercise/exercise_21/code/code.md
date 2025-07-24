# Exercise 21

<script setup>
import main from '../../../../src/exercise_21/main.tf?raw'
import variables from '../../../../src/exercise_21/variables.tf?raw'
import output from '../../../../src/exercise_21/outputs.tf?raw'
import secrets from '../../../../src/exercise_21/secrets.auto.tfvars.template?raw'
import terraformVars from '../../../../src/exercise_21/terraform.auto.tfvars?raw'
import CodeInclude from '../../../components/CodeInclude.vue'
</script>

``main.tf``
<CodeInclude :content="main" />

``variables.tf``
<CodeInclude :content="variables" />

``outputs.tf``
<CodeInclude :content="output" />

``secrets.auto.tfvars.template``
<CodeInclude :content="secrets" />

``terraform.auto.tfvars``
<CodeInclude :content="terraformVars" />
