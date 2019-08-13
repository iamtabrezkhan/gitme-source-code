// animations.ts
import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
    topToDown: trigger('topToDown', [
        state('void', style({
            transform: 'translateY(-5px)',
            opacity: '0'
        })),
        state('*', style({
            transform: 'translateY(0px)',
            opacity: '1'
        })),
        transition('void <=> *', animate('0.3s cubic-bezier(.36,1.08,.3,.88)'))
    ])

}