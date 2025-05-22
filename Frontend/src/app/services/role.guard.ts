import { Injectable } from '@angular/core';//Servisin dependency injection (bağımlılık enjeksiyonu) ile kullanılmasını sağlar.
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
//CanActivate sayfanın açılmasına izin verilip verilmeyeceğini belirleyen bir Angular Guard arayüzü.
// ActivatedRouteSnapshot ve RouterStateSnapshot şu anki sayfanın bilgilerini tutar.
import { AuthService } from './auth.service';//Kullanıcının rolünü almak için kullanılır.


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {//CanActivate arayüzünü kullanarak sayfanın açılıp açılmayacağını belirleyen bir sınıf oluşturuyoruz.
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //  this.authService kullanıcının rolünü localStorage’dan alır.
    const userRole = this.authService.getUserRole();
// state.url kullanıcının gitmek istediği sayfanın URL’sini tutar.
    if (state.url.startsWith('/student-dashboard') && userRole === 'student') {
      //Eğer kullanıcının gitmek istediği sayfa, rolüyle uyumluysa erişim veriliyor
      return true;
    }
    if (state.url.startsWith('/teacher-dashboard') && userRole === 'teacher') {
      return true;
    }
    if (state.url.startsWith('/admin-dashboard') && userRole === 'admin') {
      return true;
    }
    //Eğer kullanıcı yetkili değilse, giriş sayfasına yönlendirilir.
    this.router.navigate(['/login']);
    return false;
  }
}



