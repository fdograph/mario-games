<script lang="ts">
    import {
      getUnsortedCardPairs,
      getBackfaceImg
    } from '../games/nCardGame';

    const delay = (t: number) => new Promise(r => setTimeout(r, t));

    const backface = getBackfaceImg();
    const pairs = getUnsortedCardPairs();

    let isAnimating = false;
    let revealed = new Set<number>();
    let currentPlay = new Set<number>();
    let cards = buildCards();

    async function revealCard(card: HTMLButtonElement, direction: 'normal' | 'reverse' = 'normal') {
      isAnimating = true;
      const animation = card.animate(
        [{ transform: 'rotateY(0.5turn)' }, { transform: 'rotateY(2turn)' }],
        { duration: 1000, easing: 'ease', direction }
      );

      await animation.finished;
      isAnimating = false;

      return;
    }

    function isMatchPlay() {
      const types = new Set([...currentPlay].map(cIdx => pairs[cIdx].type));
      return types.size === 1;
    }

    function buildCards() {
      return pairs.map((c, i) => ({
        ...c,
        revealed: revealed.has(i) || currentPlay.has(i)
      }));
    }

    async function updatePlay(card: HTMLButtonElement, idx: number) {
      if(currentPlay.size === 2 || isAnimating) {
        return;
      }

      console.log('Revealing...');

      await revealCard(card);
      currentPlay = new Set<number>([...currentPlay, idx]);
      cards = buildCards();

      console.log('Revealed...');
      console.log('Ready for more');

      if(currentPlay.size === 2) {
        if(isMatchPlay()) {
          revealed = new Set<number>([...revealed, ...currentPlay]);
          currentPlay = new Set<number>();
          console.log('RIGHT!!! congrats!');
        } else {
          console.log('WRONG!!!! resetting play');
          await Promise.all([...currentPlay].map(idx =>
            revealCard(document.querySelector(`.card[data-target-idx="${idx}"]`), 'reverse')
          ));
          currentPlay = new Set<number>();
          console.log('Play resetted');
        }

        cards = buildCards();
      }
    }

    function onCardClick(event: MouseEvent) {
      const target = event.currentTarget as HTMLButtonElement;
      updatePlay(target, Number(target.dataset.targetIdx));
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
        transform: rotateY(2turn);
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
