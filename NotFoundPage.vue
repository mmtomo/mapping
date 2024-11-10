
<template> 
	<div class = "ms-5 mt-5">
      <p>下記をクリックして下さい。</p>
      <router-link to="/"><span style="font-weight:bolder;font-size: 120%;">スタートする</span></router-link>
    </div>
  </template>
  
  
  <script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

  </script>
