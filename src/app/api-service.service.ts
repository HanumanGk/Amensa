import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  public apiUrl = environment.apiUrl
  public api = environment.api;
  constructor(private http:HttpClient) { }

  signIn(data) {
    console.log(data);
    return this.http.post(this.apiUrl + 'Customer/loginCustomer', data);
  }

  register(data) {
    // console.log(data);
    return this.http.post(this.apiUrl + 'Customer/createCustomer', data);
  }

  logout() {
    return this.http.delete(this.apiUrl + 'Customer/logout');
  }

  getUserData(userid) {
    return this.http.get(this.apiUrl + 'Customer/customerProfile/'+ userid);
  }

  editProfile(data) {
    return this.http.put(this.apiUrl + 'Customer/customerData', data);
  }

  updateProfilePic(data) {
    return this.http.post(this.apiUrl + 'Customer/ProfileImageUpload',data);
  }
  updateProfileCard(data) {
    return this.http.post(this.apiUrl + 'Mastertest/ProfileCardUpload',data);
  }

  // Add Test master
  addTestmaster(data) {
    console.log(data);
    return this.http.post(this.apiUrl + 'Mastertest/createTest', data);
  }
  deleteTestData(id){
    return this.http.delete(this.apiUrl + 'Mastertest/deleteTest/'+id);
  }
  updateTest(data) {
    return this.http.post(this.apiUrl + 'Mastertest/updateTest',data);
  }
  getSingleTaskData(userid) {
    return this.http.get(this.apiUrl + 'Mastertest/customerProfile/'+ userid);
  }
  // Validatore...
  testCheckUnique(email) {
    return this.http.get(this.apiUrl + 'Mastertest/checkname/'+ email);
  }

  getTestData(){
    return this.http.get(this.apiUrl + 'Mastertest/getTestlist');
  }
  getTestSingleData($id){
    return this.http.get(this.apiUrl + 'Mastertest/getTestSingleData/' + $id);
  }

  addlabs(data) {
    console.log(data);
    return this.http.post(this.apiUrl + 'Mastertest/createLabs', data);
  }
  getLabsData(){
    return this.http.get(this.apiUrl + 'Mastertest/getLabslist');
  }
  getContainerData(){
    return this.http.get(this.apiUrl + 'Mastertest/getContainerData');
  }

  deleteLabsData(id){
    return this.http.delete(this.apiUrl + 'Mastertest/deletelabs/'+id);
  }

  editlabs(data) {
    return this.http.post(this.apiUrl + 'Mastertest/updateLabs',data);
  }

  getLabsSingleData($id){
    return this.http.get(this.apiUrl + 'Mastertest/getlabsSingleData/' + $id);
  }

  getEditedBookSingleData($id){
    return this.http.get(this.apiUrl + 'Mastertest/getEditedBookSingleData/' + $id);
  }

  getSamplesSingleData($id){
    return this.http.get(this.apiUrl + 'Mastertest/getSamplesSingleData/' + $id);
  }

  selectedTestSample(test) {
    return this.http.get(this.apiUrl + 'Mastertest/getSelectedTestSample/'+ test);
  }

  getSearchedTestLabs(test,id) {
    return this.http.get(this.apiUrl + 'Mastertest/getSearchedTestLabs/'+ test +'/'+ id);
  }

  getSearchedPackageLabs(test,id) {
    return this.http.get(this.apiUrl + 'Mastertest/getSearchedPackageLabs/'+ test +'/'+ id);
  }
  getSearchedUpdateLabs(test) {
    return this.http.get(this.apiUrl + 'Mastertest/getSearchedUpdateLabs/'+ test);
  }

  getSearchedTestLabsall(data) {
    return this.http.post(this.apiUrl + 'Mastertest/getSearchedTestLabsall/',data);
  }

  addFranchisee(data) {
    return this.http.post(this.apiUrl + 'Mastertest/createFranchisee', data);
  }
  getFranchiseeData() {
    return this.http.get(this.apiUrl + 'Mastertest/getFranchiseelist');
  }

  deleteFranchiseeData(id){
    return this.http.delete(this.apiUrl + 'Mastertest/deleteFranchisee/'+id);
  }

  getFranchiseeSingleData($id){
    return this.http.get(this.apiUrl + 'Mastertest/getFranchiseeSingleData/' + $id);
  }
  FranchiseeUpdate(data) {
    return this.http.post(this.apiUrl + 'Mastertest/updateFranchisee',data);
  }

  // Appointment
  getallAppointmentsData(){
    return this.http.get(this.apiUrl + 'Mastertest/getallAppointmentData');
  }
  gettodayAppointmentData(){
    return this.http.get(this.apiUrl + 'Mastertest/gettodayAppointmentData');
  }
  getweeklyAppointmentData(){
    return this.http.get(this.apiUrl + 'Mastertest/getWeeklyAppointmentData');
  }
}
