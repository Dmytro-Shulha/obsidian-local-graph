
<script lang="ts">
import { link } from 'fs';

	import { fade, fly } from 'svelte/transition';
	let visible = true;

    let currentNote : any = {
        name: "Note1",
        links: ["1","2","3"],
        backlinks: ["4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
    };
    

</script>

<h1> Local Graph Component</h1>

<label>
	<input type="checkbox" bind:checked={visible}>
	visible
</label>

<div class="board">
    <div class="left">
        {#each currentNote.backlinks as backlink}
            <p>{backlink}</p>
        {/each}
    </div>
    <div class="middle">
        <p class="currentNote">{currentNote.name}</p>
    </div>
    <div class="right">
        {#each currentNote.links as link}
            <p>{link}</p>
        {/each}
    </div>
</div>


<!-- {#if visible}
	<p transition:fade>
		Flies in, fades out
	</p>
{/if} -->

<style>
    h1 {
        color: orangered
    }

    .board {
        height: 30%;
        overflow: hidden;
    }

    .board p {
        border: 1px solid red;
    }

    .left p, .middle p, .right p  {
        align-content: center;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        display: grid;
        margin: auto;
        width: 100%;
    }

    .left, .middle, .right  {
        height: 100%;
        width: 33%;
        padding: 0 10%;
        float: left;
        border: 3px solid green;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
        display: grid;
    }

    .left::-webkit-scrollbar,
    .middle::-webkit-scrollbar,
    .right::-webkit-scrollbar {
        display: none;
    }

    p:hover {
        background-color: seagreen;
        transition-duration: 0.3s;
    }
</style>