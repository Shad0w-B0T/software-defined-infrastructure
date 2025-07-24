# Exercise 19

<script setup>
import main from '../../../../src/exercise_19/main.tf?raw'
import variables from '../../../../src/exercise_19/variables.tf?raw'
import secrets from '../../../../src/exercise_19/secrets.auto.tfvars.template?raw'
import terraformVars from '../../../../src/exercise_19/terraform.auto.tfvars?raw'
import CodeInclude from '../../../components/CodeInclude.vue'
</script>

``main.tf``
<CodeInclude :content="main" />

``variables.tf``
<CodeInclude :content="variables" />

``secrets.auto.tfvars.template``
<CodeInclude :content="secrets" />

``terraform.auto.tfvars``
<CodeInclude :content="terraformVars" />