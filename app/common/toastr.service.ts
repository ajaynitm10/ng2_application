import { Injectable, OpaqueToken} from '@angular/core'

//declare let toastr: any
// @Injectable()//Injectable is used when we inject other services like http 
// export class ToastrService {
//     success(message: string, title?:string){
//         toastr.success(message,title)
//     }
//     info(message: string, title?:string){
//         toastr.info(message,title)
//     }
//     warning(message: string, title?:string){
//         toastr.warning(message,title)
//     }
//     error(message: string, title?:string){
//         toastr.error(message,title)
//     }
// }


//OpaqueToken is used to create a key token that can be used to inject in DI without creating a class 

export let TOASTR_TOKEN = new OpaqueToken('toastr')

export interface Toastr {
    success (msg: string, title?: string): void
    info (msg: string, title?: string): void
    warning (msg: string, title?: string): void
    error(msg: string, title?: string): void
}