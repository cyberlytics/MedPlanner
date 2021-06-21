import { DoctorModel } from 'src/app/services/state-services/doctors-dashboard/doctor-model';
import { SpecializationModel } from 'src/app/services/state-services/specialization/specialization-model';
//import { SpecializationStateService } from 'src/app/services/state-services/specialization/specialization-state.service';


export abstract class DoctorDialog {

      get surname(): string | undefined{
        return this.doctor?.surname;
        
      } 
      get firstname(): string | undefined{
        return this.doctor?.firstName;
        
      } 

      get location(): string | undefined{
        return this.doctor?.surgery?.city;
      
      } 
    
      get zipcode(): string | undefined{
        return this.doctor?.surgery?.zipcode;
    
      } 
    
      get address(): string | undefined{
        return this.doctor?.surgery?.address;
     
      } 
    
      get telephone(): string | undefined{
        return this.doctor?.surgery?.telephoneNumber;
    
      } 
    
      get website(): string | undefined{
        return this.doctor?.surgery?.website;
      
      } 
    
      get note(): string | undefined{
        return this.doctor?.surgery?.description;
    
      }   
    
      constructor(
        protected doctor: DoctorModel,
        ) {}
} 