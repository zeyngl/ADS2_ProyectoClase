/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package g7store.Factory;

/**
 *
 * @author luisf
 */
public class ProductFactory {
    
     public Product getProduct(String productType){      
      if(productType.equalsIgnoreCase("SHIRT")){
         return new Shirt();         
      } else if(productType.equalsIgnoreCase("PANTS")){
         return new Pants();         
      } else if(productType.equalsIgnoreCase("SHOES")){
         return new Shoes();
      } else if(productType.equalsIgnoreCase("HOODIE")){
         return new Hoddie();
      }      
      return null;
   }
    
    
}
