<script lang="ts">
    import { getUnsortedCardPairs, getBackfaceImg } from '../games/nCardGame';

    const backface = getBackfaceImg();
    const pairs = getUnsortedCardPairs();

    let revealed = new Set<number>();
    let currentPlay = new Set<number>();
    let cards = pairs.map((c, i) => ({
      ...c,
      revealed: revealed.has(i) || currentPlay.has(i)
    }));

    function updatePlay(idx: number) {
      return new Set<number>([...currentPlay, idx]);
    }

    function onCardClick(event: MouseEvent) {
      const target = event.currentTarget as HTMLButtonElement;
      currentPlay = updatePlay(Number(target.dataset.targetIdx));

      cards = pairs.map((c, i) => ({
        ...c,
        revealed: revealed.has(i) || currentPlay.has(i)
      }));

      console.log({idx: target.dataset.targetIdx, currentPlay});
    }


</script>

<div class="memory-game">
    <div class="cards-board">
        {#each cards as cardData, index}
            <div class="card-wrapper">
                <button
                    class="card {cardData.revealed ? 'revealed' : ''}"
                    title="{cardData.name}"
                    aria-label="Card"
                    data-target-idx="{index}"
                    on:click={onCardClick}
                >
                    <img class="face back" src="{backface}" alt="Back face">
                    <img class="face front" src="{cardData.img}" alt="Front face">
                </button>
            </div>
        {/each}
    </div>
</div>

<style>
    @keyframes flip {
        0% {
            transform: rotateY(0.5turn);
        }
        100% {
            transform: rotateY(2turn);
        }
    }

    .memory-game {
        @apply h-full p-6 flex items-stretch justify-center;
        background-image: linear-gradient(140deg, #ffffff 12.50%, #008cff 12.50%, #008cff 25%, #fff 25%, #fff 37.50%, #ff0077 37.50%, #ff0077 50%, #ffffff 50%, #ffffff 62.50%, #008cff 62.50%, #008cff 75%, #fff 75%, #fff 87.50%, #ff0077 87.50%, #ff0077 100%);
        background-size: 99.57px 83.55px;
    }

    .cards-board {
        flex: 1;
        background: hsl(273deg 53% 33%);
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 3em;
        padding: 3em;
        box-shadow: inset 1em 1em 0 rgba(0, 0, 0, 0.3);
        perspective: 1000px;
    }

    .card-wrapper {
        display: flex;
        justify-content: center;
        perspective: 1000px;
    }

    .card {
        display: block;
        position: relative;
        aspect-ratio: 11/16;
        transform-style: preserve-3d;
        transform: rotateY(0.5turn);
    }

    .revealed {
        animation-name: flip;
        animation-duration: 1s;
        animation-iteration-count: 1;
        animation-timing-function: ease;
        animation-fill-mode: forwards;
    }

    .face {
        content: "";
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        filter: drop-shadow(0.75em 0.75em 0 rgba(0, 0, 0, 0.5));
    }

    .back {
        transform: rotateY(180deg);
    }

    .front {
        transform: rotateY(0deg);
    }
</style>
