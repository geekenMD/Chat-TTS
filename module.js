function broadcast() {
    koi.sendMessage("Be sure to follow TWG2022 on Twitter https://twitter.com/TWG2022");

    setTimeout(broadcast, (5 * 60) * 1000);
}

broadcast();
