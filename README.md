# p5-Physic-Simulations
In this Repository I am going to publish Physic Simulations I made in p5.js.

This Repository will be my diary as I improve my skills in javascript with p5.js as well as my general understanding of physics. 

The code is going to have a lot of comments that show my learn and though process. 
I hope you enjoy!

## Electric Field Simulation
This project is the first physics simulation I made using p5.js. 
I showed the electric field created by Electrons and Protons by calculating the Force applied to small charges on the Canvas and displayed these vectors with arrows. I made use of the formula for electric force on an electric field.



![grafik](https://github.com/xlikesasukee/p5-Physic-Simulations/assets/127507698/2a6c9d2b-46de-4266-992e-785baafcde3c)

(https://qph.cf2.quoracdn.net/main-qimg-4d7e7ca08e8bd4d8f034de7b2c96aa64)

To add direction I just had to multiply by the distance vector normalized and finally do the same for the force vector. I used Robert Eisele Complex.js library for complex numbers. 

I learned a lot and had a lot of fun writing this little program. I hope you like it.

The controls to use the program are simple:
"q" - to spawn Proton
"w" - to spawn Electron
"e" - to draw electric field
"r" - to remove last cerated Particle
