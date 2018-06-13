<template>
    <mdc-card class="content">
      <mdc-card-text>
        <mdc-textfield dense v-model="title"      label="Titel" />
        <mdc-radio     dense v-model="difficulty" label="Simpel" name="difficulty" />
        <mdc-radio     dense v-model="difficulty" label="Normal" name="difficulty" />
        <mdc-radio     dense v-model="difficulty" label="Schwer" name="difficulty" />
        <mdc-textfield dense v-model="duration"   label="Dauer in Minuten" />
        <mdc-textfield dense v-model="imageUrl"   label="Bild-URL" />
        <table id="ingredient-table">
          <tr v-for="i in ingredients" :key="">
            <td>
              <input class="newIg" @keyup.enter="newIgAddNew" v-model="i.amount" type="text" placeholder="700" />
            </td>
            <td>
              <input class="newIg" @keyup.enter="newIgAddNew" v-model="i.unit" type="text" placeholder="g" />
            </td>
            <td>
              <input class="newIg" @keyup.enter="newIgAddNew" v-model="i.name" type="text" placeholder="Kartoffeln" />
            </td>
          </tr>
        </table>
        <mdc-textfield v-model="instructions" label="Anleitung" multiline></mdc-textfield>
      </mdc-card-text>
    </mdc-card>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      duration: '20',
      difficulty: 'Normal',
      imageUrl: '',
      ingredients: [{
        amount: '',
        unit: '',
        name: ''
      }]
    }
  },
  methods: {
    newIgAddNew() {
      console.log(this.ingredients)
      var last = this.ingredients[this.ingredients.length - 1]
      if (last.amount.length + last.unit.length + last.name.length > 0) {
        this.ingredients.push({
          amount: '',
          unit: '',
          name: ''
        })
      }
      this.$nextTick(function() {
        var rows = document
          .getElementById('ingredient-table')
          .getElementsByTagName('tr')
        var lastRow = rows[rows.length - 1]
        var inputs = lastRow.getElementsByTagName('input')
        inputs[0].focus()
      })
    }
  }
}
</script>

<style lang="scss">

#ingredient-table {
  margin-top: 16px;
  width: 100%;
  border-collapse: collapse;
  td {
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 0 16px;

    &:not(:first-child) {
      border-left: 1px solid rgba(0, 0, 0, 0.12);
    }

    &:not(:last-child) {
      width: 25%;
    }
  }
  tr {
    td {
      padding: 0;
      input {
        padding: 0 16px;
        border: none;
        background: none;
        height: 100%;
        width: 100%;
      }
    }
  }
}

</style>
