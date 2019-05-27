<template>
  <div class="container position-static">
      <div class="row">
        <div class="col-sm">
          <form class="form-inline">
            <label class="sr-only" for="inlineFormInputName2">Domain</label>
            <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="google.com">
            <button type="submit" class="btn btn-primary mb-2">Analyze</button>
          </form>
        </div>
        <div class="col-sm text-right">
          <h1>SSLLab Test</h1>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>
