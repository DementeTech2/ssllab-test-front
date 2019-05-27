<template>
  <div class="container position-stati">
      <div class="row">
        <div class="col-sm">
          <form class="form-inline">
            <label class="sr-only" for="inlineFormInputName2">Domain</label>
            <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Jane Doe">
            <button type="submit" class="btn btn-primary mb-2">Analyze</button>
          </form>
        </div>
        <div class="col-sm">
          <h1>{{ msg }}</h1>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
