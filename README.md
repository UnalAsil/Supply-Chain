# Supply Chain on Hyperledger
A DID based Supply Chain system on Hyperledger Fabric.

TÜBİTAK BİLGEM Blockchain Laboratory, Summer 2020
# Türkçe dokümantasyon :tr:
Proje geliştiricileri
 - Caner Emeç <a href="mailto:caner.emec@gmail.com" target="_blank">:email:</a>
 - Ömer Kurttekin <a href="mailto:o.kurttekin@hotmail.com" target="_blank">:email:</a>
 - Ünal Asil <a href="mailto:unalyildiz37@gmail.com" target="_blank">:email:</a>

Katkıda bulunanlar
 - Taner Dursun
 - Nevzat Özcandan
 - Ahmet Bilal Uçan
## Kurulum
Bu aşama Hyperledger Fabric için gerekli olan yazılımların Linux üzerindeki kurulumu göstermektedir.
```
sudo apt install git
sudo apt install curl
```
### Docker kurulumu
Docker [yönergelerini](https://docs.docker.com/engine/install/ubuntu/) takip ederek kurunuz.
```
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
```
```
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```
```
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
Çalıştığını test edin.
```
docker --version
sudo docker run hello-world
```
Docker daemon'ın çalıştığına emin olun ve kullanıcınızı docker grubuna ekleyin.
```
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker <username>
```

### NodeJS ve npm kurulumu
```
sudo apt install nodejs
node -v
```
```
sudo apt install npm
```

### Hyperledger Fabric kurulumu

Resmi [Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/en/release-2.2/install.html) dokümanında bulunan güncel bağlantı üzerinden Hyperledger Fabric binary'lerini ve fabric-samples klasörünü indirin.
```
curl -sSL https://bit.ly/2ysbOFE | bash -s
cd fabric-samples
```
Bu projeyi içine kurun (tavsiye edilen)
```
git clone http://bag.org.tr/proje/omer.kurttekin/supply-chain-on-hyperledger.git
```
Dosyaları gerekli dizine kopyalayan script'i çalıştırın.
```
cd supply-chain-on-hyperledger
./prepareNetwork.sh prepare
```
## Blokzincir ağını ayağa kaldırın
fabric-samples/foodchain dizinine gidin.
```
cd ../foodchain
```
Ağı ayağa kaldıracak script'i çalıştırın
```
./startFabric.sh
```
## Ağı Test Edin
fabric-samples/foodchain/javascript dizinine gidin.
```
cd javascript/
```
Test script'ini çalıştırın.
```
./test.sh
```
Test scripti çalıştığında ekrana aşağıdaki yazı gelir.


```
##############################################################
##############################################################
########               TEST MODULE              ##############
##############################################################
##############################################################


-- Select Test Number & Press Enter
>> [1] Prerequists
>> [2] Create Wallets (Producer, Inspector, Logistic, Market, Customer)
>> [3] Create Users (Inspector, Logistic)

>> [4] Create Products

>> [5] Asset Read Test
>> [6] Asset Delete Test
>> [7] Getting All Assets Test
>> [8] Getting Specific Asset History Test
>> [9] Filter Assets Test

>> [10] Price Update Test
>> [11] Transfer Product Ownership Test

>> [12] Update Inspector Price Test
>> [13] Hire Inspector & Inspect Product Test

>> [14] Logistic Price Update Test
>> [15] Logistic Truck Capacity Update Test
>> [16] Hire Logistic Test
>> [17] Transport Product Test


>> [-1] Exit


##############################################################
##############################################################
>> :



```

Konsol üzerinden 1 denilerek client tarafında walletler oluşturulur, admin ve kullanıcılar bu wallet'lara eklenir.
2 denilerek chaincode üzerinde wallet asseti oluşturulur.
3 denilerek yeni kullanıcılar oluşturulur.
4 denilerek örnek ürünler yaratılır.

Bu adımlardan sonra yapılmak istenen testin numarası seçilerek test çalıştırılır. Çıkış yapmak için '-1' girilmelidir.

## Web Uygulamasını Çalıştırın.
Öncelikle "fabric-samples/web-app" dizinine gidilir.

``` cd <fabric-samples directory path>/fabric-samples/web-app ```

Daha sonra npm ile bağımlılıklar yüklenir.

``` npm install ```

Uygulama başlatılır.

``` npm start ```

Aynı dizinde yeni bir terminal açılır.

``` cd react-app ```

Daha sonra npm ile bağımlılıklar yüklenir.

``` npm install ```

Uygulama başlatılır.

``` npm start ```

Varsayılan tarayıcıda uygulama çalışmaya başlayacaktır.