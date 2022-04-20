<script>
    import {getBackfaceImg, getUnsortedCardPairs} from "../games/nCardGame";

    const backface = getBackfaceImg();
    const pairs = getUnsortedCardPairs();
    const testImg = pairs[0];
</script>
<div class="page">
    <div class="card-wrapper">
        <button class="card" >
            <div class="front" >
                <img src="{backface}">
            </div>
            <div class="back" >
                <img src="{testImg.img}">
            </div>
        </button>
    </div>
</div>

<style>
    @keyframes flip {
        0% {
            transform: rotateY(0deg);
        }
        100% {
            transform: rotateY(360deg);
        }
    }


    .page {
        @apply h-full p-6 flex items-stretch justify-center;
    }

    .card-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        perspective: 1000px;
    }

    .card {
        display: block;
        position: relative;
        aspect-ratio: 11/16;
        height: 100%;
        transform: rotateY(0);
        transform-style: preserve-3d;
        animation-name: flip;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    .front, .back {
        content: "";
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        filter: drop-shadow(0.75em 0.75em 0 rgba(0, 0, 0, 0.5));
    }

    .front img, .back img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .back {
        transform: rotateY(180deg);
    }

    .front {
        transform: rotateY(0deg);
    }
</style>