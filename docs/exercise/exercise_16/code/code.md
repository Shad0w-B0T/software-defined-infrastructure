# Exercise 16

<script setup>
import main from '../../../../src/exercise_16/main.tf?raw'
import output from '../../../../src/exercise_16/outputs.tf?raw'
import variables from '../../../../src/exercise_16/variables.tf?raw'
import secrets from '../../../../src/exercise_16/secrets.auto.tfvars.template?raw'
import userData from '../../../../src/exercise_16/tpl/userData.yml?raw'
import CodeInclude from '../../../components/CodeInclude.vue'
</script>

## ``main.tf``
<CodeInclude :content="main" />

## ``outputs.tf``
<CodeInclude :content="output" />

## ``variables.tf``
<CodeInclude :content="variables" />

## ``secrets.auto.tfvars.template``
<CodeInclude :content="secrets" />

## ``userData.yml``
<CodeInclude :content="userData" />
