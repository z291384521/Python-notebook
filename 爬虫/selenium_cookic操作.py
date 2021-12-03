from selenium import webdriver
#请求网络
url = "http://www.baidu.com"
driver = webdriver.Chrome()
driver.get(url)
print(driver.get_cookies())
#进行cookic处理
#变成BIDUPSID=F517CB2609DDE4009BD6C57C7115E6C0;
# PSTM=1638524103; BAIDUID=F517CB2609DDE400638C14DC5B26CF7E:FG=1;
# BD_HOME=1;
# H_PS_PSSID=35104_31660_34584_34505_35234_34578_35329_35324_26350_35301;
# BD_UPN=12314753;
# BA_HECTOR=282124a424212k45ik1gqjpa90r
cookies = {data['name']: data['value']for data in driver.get_cookies()}
print(cookies)