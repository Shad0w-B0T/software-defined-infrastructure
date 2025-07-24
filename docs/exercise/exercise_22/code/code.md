# Exercise 22

<script setup>
import main from '../../../../src/exercise_22/main.tf?raw'
import variables from '../../../../src/exercise_22/variables.tf?raw'
import output from '../../../../src/exercise_22/outputs.tf?raw'
import terraformVars from '../../../../src/exercise_22/terraform.auto.tfvars?raw'
import CodeInclude from '../../../components/CodeInclude.vue'
</script>

## ``main.tf``
<CodeInclude :content="main" />

## ``variables.tf``
<CodeInclude :content="variables" />

## ``outputs.tf``
<CodeInclude :content="output" />

## ``terraform.auto.tfvars``
<CodeInclude :content="terraformVars" />
