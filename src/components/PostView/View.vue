<template>
  <ul class="content" v-on:confirm-changes="confirmChanges">
    <li>
      <h2>Titel</h2>
      <input v-model="name" type="text" placeholder="Titel" />
    </li>
    <li>
      <h2>Beschreibung</h2>
      <input v-model="description" type="text" />
    </li>
    <li>
      <h2>Schwierigkeitsgrad</h2>
      <mdc-radio dense v-model="difficulty" label="Simpel" name="difficulty" />
      <mdc-radio dense v-model="difficulty" label="Normal" name="difficulty" />
      <mdc-radio dense v-model="difficulty" label="Schwer" name="difficulty" />
    </li>
    <li>
      <h2>prepTime</h2>
      <input v-model="prepTime" type="number" step="10" min="10" />
    </li>
    <li>
      <h2>cooktime</h2>
      <input v-model="cookTime" type="number" step="10" min="10" />
    </li>
    <li>
      <h2>Zubereitungsart</h2>
      <input v-model="cookingMethod" type="text" />
    </li>
    <li>
      <h2>Kategorie</h2>
      <input v-model="category" type="text" />
    </li>
    <li>
      <h2>Küche/ Nationalität</h2>
      <input v-model="cuisine" type="text" />
    </li>
    <li>
      <h2>Tags (durch Kommata getrennt)</h2>
      <input v-model="tags" type="text" />
    </li>
    <li>
      <h2>Bild</h2>
      <input v-model="image" type="url" placeholder="Bild-URL" />
    </li>
    <li>
      <h2>Zutaten</h2>
      <table class="data-table">
        <tr v-for="(i, index) in ingredients" :key="index">
          <td>
            <input class="newIg" v-model="i.amount" type="text" placeholder="700" />
          </td>
          <td>
            <input class="newIg" v-model="i.unit" type="text" placeholder="g" />
          </td>
          <td>
            <input class="newIg" v-model="i.name" type="text" placeholder="Kartoffeln" />
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <button @click="newIg">Zutat hinzufügen</button>
          </td>
        </tr>
      </table>
    </li>
    <li>
      <h2>Nährwerte</h2>
      <table class="data-table">
        <tr v-for="(n, index) in nutritionalValues" :key="index">
          <td>
            <input class="newIg" v-model="n.amount" type="text" placeholder="700" />
          </td>
          <td>
            <input class="newIg" v-model="n.unit" type="text" placeholder="kcal" />
          </td>
          <td>
            <input class="newIg" v-model="n.name" type="text" placeholder="Kalorien" />
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <button @click="newNv">Nährwert hinzufügen</button>
          </td>
        </tr>
      </table>
    </li>
    <li>
      <h2>Zubereitung</h2>
      <textarea v-model="instructions" placeholder="Anleitung"></textarea>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      difficulty: 'Normal',
      prepTime: '',
      cookTime: '',
      cookingMethod: '',
      category: '',
      cuisine: '',
      tags: '',
      image: '',
      ingredients: [{
        amount: '',
        unit: '',
        name: ''
      }],
      nutritionalValues: [{
        amount: '',
        unit: '',
        name: ''
      }],
      instructions: ''
    }
  },
  methods: {
    // newIgAddNew() {
    //   console.log('ingredients, newIgAddNew', this.ingredients)
    //   var last = this.ingredients[this.ingredients.length - 1]
    //   if (last.amount.length + last.unit.length + last.name.length > 0) {
    //     this.ingredients.push({
    //       amount: '',
    //       unit: '',
    //       name: ''
    //     })
    //   }
    //   this.$nextTick(function() {
    //     var rows = document
    //       .getElementById('ingredient-table')
    //       .getElementsByTagName('tr')
    //     var lastRow = rows[rows.length - 1]
    //     var inputs = lastRow.getElementsByTagName('input')
    //     inputs[0].focus()
    //   })
    // },
    newIg() {
      this.ingredients.push({
        amount: '',
        unit: '',
        name: ''
      })
    },
    newNv() {
      this.nutritionalValues.push({
        amount: '',
        unit: '',
        name: ''
      })
    },
    confirmChanges() {
      alert('confirmChanges')
    }
  }
}
</script>

<style lang="scss">
.content {
  column-count: 2;
}

.data-table {
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
