import { Injectable , Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';// Angular SSR (Server-Side Rendering) sırasında localStorage erişimi kontrol etmek için kullanılır.
import { HttpClient } from '@angular/common/http';
import { Observable ,map, tap} from 'rxjs'; //API çağrılarında asenkron veri akışını yönetmek için kullanılır.



export interface User {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users';
  public currentUserEmail: string | null = null; // Burada saklıyoruz
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Login methodunu güncelle
  login(email: string, password: string): Observable<User> {
    // POST isteği için body oluştur
    const loginData = {
      email: email,
      password: password
    };

    // POST isteği yap
    return this.http.post<User>(`${this.apiUrl}/login`, loginData).pipe(
      tap(user => {
        if (user && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('userRole', user.role);
          this.currentUserEmail = user.email;
        }
      })
    );
  }

  getCurrentUserEmail(): string | null {
    return this.currentUserEmail; // dışarıdan erişim için
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }

  getUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('user') || 'null');
    }
    return null;
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user?.role || null;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('user');
    }
    return false;
  }
}


