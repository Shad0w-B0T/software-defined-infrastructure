# Exercise 14

<script setup>
import main from '../../../../src/exercise_14/main.tf?raw'
import output from '../../../../src/exercise_14/outputs.tf?raw'
import variables from '../../../../src/exercise_14/variables.tf?raw'
import secrets from '../../../../src/exercise_14/secrets.auto.tfvars.template?raw'
import userData from '../../../../src/exercise_14/tpl/userData.yml?raw'
import scp from '../../../../src/exercise_14/tpl/scp.sh?raw'
import ssh from '../../../../src/exercise_14/tpl/ssh.sh?raw'
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

``userData.yml``
<CodeInclude :content="userData" />

``scp.sh``
<CodeInclude :content="scp" />

``ssh.sh``
<CodeInclude :content="ssh" />