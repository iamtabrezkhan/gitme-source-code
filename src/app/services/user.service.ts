import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userUrl = 'https://api.github.com/user';
  public singleUserUrl = 'https://api.github.com/users/';
  public myPublicReposUrl = 'https://api.github.com/user/repos?type=public';
  public myFollowersUrl = 'https://api.github.com/user/followers';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  saveTokenLocalStorage(token) {
    localStorage.setItem('access_token', token);
  }

  getTokenLocalStorage() {
    return localStorage.getItem('access_token');
  }

  fetchUser(token) {
    var headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });
    return this.http.get(this.userUrl, {headers: headers});
  }

  fetchSingleUser(username, token) {
    var headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });
    return this.http.get(`${this.singleUserUrl}${username}`, {headers: headers});
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getUserLocalStorage() {
    return JSON.parse(localStorage.getItem('user'));
  }

  saveUserLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  fetchMyPublicRepos() {
    var headers = new HttpHeaders({
      'Authorization': `token ${this.getTokenLocalStorage()}`
    });
    return this.http.get(this.myPublicReposUrl, {headers: headers});
  }

  fetchUserPublicRepo(username) {
    var headers = new HttpHeaders({
      'Authorization': `token ${this.getTokenLocalStorage()}`
    });
    var userPublicReposUrl = `https://api.github.com/users/${username}/repos?type=public`
    return this.http.get(`${userPublicReposUrl}`, {headers: headers});
  }

  fetchUserGists(username) {
    var headers = new HttpHeaders({
      'Authorization': `token ${this.getTokenLocalStorage()}`
    });
    var userPublicGistsUrl = `https://api.github.com/users/${username}/gists`
    return this.http.get(`${userPublicGistsUrl}`, {headers: headers});
  }

  fetchMyFollowers() {
    var headers = new HttpHeaders({
      'Authorization': `token ${this.getTokenLocalStorage()}`
    });
    return this.http.get(`${this.myFollowersUrl}`, {headers: headers});
  }

  fetchUserFollowers(username) {
    var headers = new HttpHeaders({
      'Authorization': `token ${this.getTokenLocalStorage()}`
    });
    var userFollowersUrl = `https://api.github.com/users/${username}/followers`
    return this.http.get(`${userFollowersUrl}`, {headers: headers});
  }

  loadMoreFollowers(username, page) {
    var headers = new HttpHeaders({
      'Authorization': `token ${this.getTokenLocalStorage()}`
    });
    var userFollowersUrl = `https://api.github.com/users/${username}/followers?page=${page}`
    return this.http.get(`${userFollowersUrl}`, {headers: headers});
  }

  searchUser(query, page) {
    var headers = new HttpHeaders({
      'Authorization': `token ${this.getTokenLocalStorage()}`
    });
    var userFollowersUrl = `https://api.github.com/search/users?q=${query}&page=${page}`
    return this.http.get(`${userFollowersUrl}`, {headers: headers});
  }

}
