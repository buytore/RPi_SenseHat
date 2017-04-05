Many thanks to thinktor for putting this together initially
(https://github.com/narenaryan/thinktor)

Porting to use with Raspberry Pi and SenseHat module to 
store humidity, pressure and temperature in RethinkDB, and 
upon changes update Google Charts on we page.

A tornado and RethinkDB real-time Data Push engine

This project uses Python Tornado web browser and RethinkDB to notify Google Charts of updates
in real time and the Raspberry Pi read the SenseHat.

I installed miniconda using these instruction onto Raspberry Pi
https://www.continuum.io/blog/developer/anaconda-raspberry-pi

Once installed created an Conda environment
~~~
 > conda create -n py27RDB python=2.7
 > source activate py27RDB
 (py27RDB)> pip install -r requirements.txt
 python app.py
~~~



Here's the original instructions as well.



just install requirements

~~~
$ pip install requirements.txt
$ python app.py
~~~

Visit http://localhost:8000 to see the website.

Note: First install rethinkDB server using below commands
~~~

$ source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
$ wget -qO- http://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
$ sudo apt-get update
$ sudo apt-get install rethinkdb
$ sudo cp /etc/rethinkdb/default.conf.sample /etc/rethinkdb/instances.d/instance1.conf
$ sudo /etc/init.d/rethinkdb restart

~~~
