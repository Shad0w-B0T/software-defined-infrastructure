# Exercise 23

<script setup>
import main from '../../../../src/exercise_23/main.tf?raw'
import variables from '../../../../src/exercise_23/variables.tf?raw'
import secrets from '../../../../src/exercise_23/secrets.auto.tfvars.template?raw'
import output from '../../../../src/exercise_23/outputs.tf?raw'
import cert from '../../../../src/exercise_23/cert.tf?raw'
import dns from '../../../../src/exercise_23/dns.tf?raw'
import userData from '../../../../src/exercise_23/tpl/userData.yml?raw'
import CodeInclude from '../../../components/CodeInclude.vue'
</script>

## ``main.tf``
<CodeInclude :content="main" />

## ``variables.tf``
<CodeInclude :content="variables" />

## ``outputs.tf``
<CodeInclude :content="output" />

## ``secrets.auto.tfvars.template``
<CodeInclude :content="secrets" />

## ``cert.tf``
<CodeInclude :content="cert" />

## ``dns.tf``
<CodeInclude :content="dns" />

## ``userData.yml``
<CodeInclude :content="userData" />
