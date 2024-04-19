import {computed, atom, onSet} from "nanostores"
import {$media, findContent} from "./media"
import {$hasText} from "./text.js";

export const $audio = computed($media, media => findContent('audio') ?? []);
export const $hasAudio = computed($media, media => Object
    .values(media)
    .filter(({key}) => key === "audio").length > 0)
export const $audioOpen = atom(!$hasText.get())

export const $playAudio = () => {
    if (!$hasAudio.get()) return

    if ($audioOpen.get()) {
        $audioOpen.set(false)
        setTimeout(() => $audioOpen.set(true))
    } else {
        $audioOpen.set(true)
    }

}

onSet($media, () => {
    $audioOpen.set(!$hasText.get())
})