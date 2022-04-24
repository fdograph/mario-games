<script lang="ts">
    import {
      getUnsortedCardPairs,
      getBackfaceImg,
      getHighlightImg,
      soundEffects
    } from '../games/nCardGame';

    const backface = getBackfaceImg();
    const highlight = getHighlightImg();
    const pairs = getUnsortedCardPairs();

    let isAnimating = false;
    let revealed = new Set<number>();
    let currentPlay = new Set<number>();
    let cards = buildCards();

    async function animateBg() {
      isAnimating = true;
      const animation = document.querySelector('.memory-game').animate(
          [{ backgroundPosition: '0 center' }, { backgroundPosition: ' 100px center' }],
          { duration: 150, easing: 'steps(2)', direction: 'normal', iterations: 10 }
      );

      await animation.finished;
      isAnimating = false;

      return;
    }
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
      if(currentPlay.size === 2 || isAnimating || revealed.has(idx) || currentPlay.has(idx)) {
        return;
      }

      console.log('Revealing...');

      await revealCard(card);
      currentPlay = new Set<number>([...currentPlay, idx]);
      cards = buildCards();

      console.log('Revealed...');

      if(currentPlay.size !== 2){
        console.log('Ready for more');
        return;
      }

      if(isMatchPlay()) {
        revealed = new Set<number>([...revealed, ...currentPlay]);
        await Promise.all([
          soundEffects.correctMatch().play(),
          await animateBg(),
        ]);
        console.log('RIGHT!!! congrats!');
      } else {
        console.log('WRONG!!!! resetting play');
        await Promise.all([
            soundEffects.wrongMatch().play(),
            ...[...currentPlay].map(idx =>
                revealCard(document.querySelector(`.card[data-target-idx="${idx}"]`), 'reverse')
            )
        ]);
      }

      currentPlay = new Set<number>();
      cards = buildCards();
    }

    function onCardClick(event: MouseEvent) {
      const target = event.currentTarget as HTMLButtonElement;
      updatePlay(target, Number(target.dataset.targetIdx));
    }
</script>

<div class="memory-game">
    <div class="cards-board">
        {#each cards as cardData, index}
            <div class="card-wrapper" style="--highlight-img: url({highlight});" >
                <button
                    class="card {cardData.revealed ? 'revealed' : ''}"
                    disabled="{cardData.revealed}"
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
        background-image: linear-gradient(-40deg, #ffffff 12.50%, #008cff 12.50%, #008cff 25%, #fff 25%, #fff 37.50%, #ff0077 37.50%, #ff0077 50%, #ffffff 50%, #ffffff 62.50%, #008cff 62.50%, #008cff 75%, #fff 75%, #fff 87.50%, #ff0077 87.50%, #ff0077 100%);
        background-size: 99.57px 83.55px;
        background-position: 0 center;
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
        position: relative;
        display: flex;
        justify-content: center;
        perspective: 1000px;
    }

    .card-wrapper::before {
        content: "";
        display: none;
        position: absolute;
        background-image: var(--highlight-img);
        background-size: contain;
        background-position: center center;
        aspect-ratio: 8/11;
        z-index: 10;
        flex-grow: 1;
        height: 130%;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        pointer-events: none;
    }

    .card-wrapper:focus-within::before {
        display: block;
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
