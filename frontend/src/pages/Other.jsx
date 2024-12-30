{/* Confidence Slider */}
          <Flex direction="column">
            <Flex align="center" justify="space-between" mb="4">
              <Text mr="4">Confidence Threshold:</Text>
              <Flex flex="1" align="center">
                <Slider
                  defaultValue={confidence}
                  min={50}
                  max={100}
                  step={5}
                  onChange={(val) => setConfidence(val)}
                  width="100%"
                >
                  <SliderTrack bg="gray.200">
                    <SliderFilledTrack bg={primaryColor} />
                  </SliderTrack>
                  <SliderThumb
                    boxSize={5}
                    border="1px"
                    borderColor={useColorModeValue("gray.200", "gray.400")}
                  />
                </Slider>
              </Flex>
              <Text ml={4} fontWeight="bold">{confidence}%</Text>
            </Flex> 
            <Text fontSize="sm" mb="4" textAlign="justify" color={useColorModeValue("gray.500", "gray.400")}>
              {useBreakpointValue({
                base: "The confidence slider lets you adjust the threshold. FactGuard Detect will only classify news as fake or true if the certainty exceeds the selected threshold.",
                lg: "The confidence slider lets you adjust the threshold that determines the minimum certainty required for classifying news. For instance, if set to 70%, FactGuard Detect will only classify news as fake or true when it is at least 70% confident in its prediction."
            })}
            </Text>
          </Flex>